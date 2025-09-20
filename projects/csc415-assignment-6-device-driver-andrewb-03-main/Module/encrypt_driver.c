\/**************************************************************
* Class::  CSC-415-01 Summer 2025
* Name:: Andrew Brockenborough
* Student ID:: 921749371
* GitHub-Name:: andrewb-03
* Project:: Assignment 6 – Device Driver
*
* File:: encrypt_driver.c
*
* Description:: This device driver provides encryption/decryption functionality.
* It can encrypt strings using a simple Caesar cipher and decrypt them back.
* The driver implements a character device with read, write, and ioctl operations.
*
**************************************************************/

#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/uaccess.h>
#include <linux/slab.h>
#include <linux/device.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Andrew Brockenborough");
MODULE_DESCRIPTION("A simple encryption/decryption device driver");
MODULE_VERSION("1.0");

// Device driver name and major number
#define DEVICE_NAME "encrypt_dev"
#define CLASS_NAME "encrypt_class"

// IOCTL commands
#define ENCRYPT_MODE 0
#define DECRYPT_MODE 1
#define SET_KEY 2

// Global variables
static int major_number;
static struct class* encrypt_class = NULL;
static struct device* encrypt_device = NULL;

// Buffer to store the string
static char* message_buffer = NULL;
static int buffer_size = 0;
static int current_mode = ENCRYPT_MODE;  // Default to encrypt mode
static int encryption_key = 3;  // Default Caesar cipher shift

// Function prototypes
static int dev_open(struct inode*, struct file*);
static int dev_release(struct inode*, struct file*);
static ssize_t dev_read(struct file*, char*, size_t, loff_t*);
static ssize_t dev_write(struct file*, const char*, size_t, loff_t*);
static long dev_ioctl(struct file*, unsigned int, unsigned long);

// Caesar cipher encryption function
static void encrypt_string(char* input, char* output, int key) {
    int i = 0;
    while (input[i] != '\0') {
        if (input[i] >= 'a' && input[i] <= 'z') {
            output[i] = 'a' + ((input[i] - 'a' + key) % 26);
        } else if (input[i] >= 'A' && input[i] <= 'Z') {
            output[i] = 'A' + ((input[i] - 'A' + key) % 26);
        } else {
            output[i] = input[i];  // Keep non-alphabetic characters unchanged
        }
        i++;
    }
    output[i] = '\0';
}

// Caesar cipher decryption function
static void decrypt_string(char* input, char* output, int key) {
    int i = 0;
    while (input[i] != '\0') {
        if (input[i] >= 'a' && input[i] <= 'z') {
            output[i] = 'a' + ((input[i] - 'a' - key + 26) % 26);
        } else if (input[i] >= 'A' && input[i] <= 'Z') {
            output[i] = 'A' + ((input[i] - 'A' - key + 26) % 26);
        } else {
            output[i] = input[i];  // Keep non-alphabetic characters unchanged
        }
        i++;
    }
    output[i] = '\0';
}

// File operations structure
static struct file_operations fops = {
    .owner = THIS_MODULE,
    .open = dev_open,
    .read = dev_read,
    .write = dev_write,
    .release = dev_release,
    .unlocked_ioctl = dev_ioctl,
    .compat_ioctl = dev_ioctl
};

// Open function - called when device is opened
static int dev_open(struct inode *inodep, struct file *filep) {
    printk(KERN_INFO "Encrypt driver: Device opened\n");
    return 0;
}

// Release function - called when device is closed
static int dev_release(struct inode *inodep, struct file *filep) {
    printk(KERN_INFO "Encrypt driver: Device closed\n");
    return 0;
}

// Read function - returns the processed string (encrypted or decrypted)
static ssize_t dev_read(struct file *filep, char *buffer, size_t len, loff_t *offset) {
    int error_count = 0;
    
    // If buffer is empty, return 0
    if (buffer_size == 0) {
        printk(KERN_INFO "Encrypt driver: No data to read\n");
        return 0;
    }
    
    // Copy data to user space
    error_count = copy_to_user(buffer, message_buffer, buffer_size);
    
    if (error_count == 0) {
        printk(KERN_INFO "Encrypt driver: Sent %d characters to user\n", buffer_size);
        int bytes_read = buffer_size;  // Store the number of bytes read
        // Clear the buffer after reading
        if (message_buffer) {
            kfree(message_buffer);
            message_buffer = NULL;
        }
        buffer_size = 0;
        return bytes_read;  // Return the actual number of bytes read
    } else {
        printk(KERN_INFO "Encrypt driver: Failed to send %d characters to user\n", error_count);
        return -EFAULT;
    }
}

// Write function - stores the input string and processes it
static ssize_t dev_write(struct file *filep, const char *buffer, size_t len, loff_t *offset) {
    char* temp_buffer;
    char* processed_buffer;
    
    // Allocate memory for the input string
    temp_buffer = kmalloc(len + 1, GFP_KERNEL);
    if (!temp_buffer) {
        printk(KERN_ALERT "Encrypt driver: Failed to allocate memory\n");
        return -ENOMEM;
    }
    
    // Copy data from user space
    if (copy_from_user(temp_buffer, buffer, len)) {
        kfree(temp_buffer);
        printk(KERN_ALERT "Encrypt driver: Failed to copy data from user\n");
        return -EFAULT;
    }
    temp_buffer[len] = '\0';  // Null terminate
    
    // Free old buffer if it exists
    if (message_buffer) {
        kfree(message_buffer);
    }
    
    // Allocate memory for processed string
    processed_buffer = kmalloc(len + 1, GFP_KERNEL);
    if (!processed_buffer) {
        kfree(temp_buffer);
        printk(KERN_ALERT "Encrypt driver: Failed to allocate memory for processed string\n");
        return -ENOMEM;
    }
    
    // Process the string based on current mode
    if (current_mode == ENCRYPT_MODE) {
        encrypt_string(temp_buffer, processed_buffer, encryption_key);
        printk(KERN_INFO "Encrypt driver: Encrypted string with key %d\n", encryption_key);
    } else {
        decrypt_string(temp_buffer, processed_buffer, encryption_key);
        printk(KERN_INFO "Encrypt driver: Decrypted string with key %d\n", encryption_key);
    }
    
    // Store the processed string
    message_buffer = processed_buffer;
    buffer_size = strlen(processed_buffer);
    
    // Clean up temporary buffer
    kfree(temp_buffer);
    
    printk(KERN_INFO "Encrypt driver: Received %zu characters from user\n", len);
    return len;
}

// IOCTL function - handles mode switching and key setting
static long dev_ioctl(struct file *filep, unsigned int cmd, unsigned long arg) {
    printk(KERN_INFO "Encrypt driver: IOCTL called with cmd=%d, arg=%ld\n", cmd, arg);
    
    switch (cmd) {
        case ENCRYPT_MODE:
            current_mode = ENCRYPT_MODE;
            printk(KERN_INFO "Encrypt driver: Switched to ENCRYPT mode\n");
            break;
            
        case DECRYPT_MODE:
            current_mode = DECRYPT_MODE;
            printk(KERN_INFO "Encrypt driver: Switched to DECRYPT mode\n");
            break;
            
        case SET_KEY:
            encryption_key = (int)arg;
            printk(KERN_INFO "Encrypt driver: Key set to %d\n", encryption_key);
            break;
            
        default:
            printk(KERN_INFO "Encrypt driver: Unknown ioctl command %d\n", cmd);
            return -EINVAL;
    }
    
    return 0;
}

// Module initialization function
static int __init encrypt_init(void) {
    printk(KERN_INFO "Encrypt driver: Initializing the encrypt driver\n");
    
    // Register the character device
    major_number = register_chrdev(0, DEVICE_NAME, &fops);
    if (major_number < 0) {
        printk(KERN_ALERT "Encrypt driver failed to register a major number\n");
        return major_number;
    }
    
    printk(KERN_INFO "Encrypt driver: registered correctly with major number %d\n", major_number);
    
    // Register the device class
    encrypt_class = class_create(CLASS_NAME);
    if (IS_ERR(encrypt_class)) {
        unregister_chrdev(major_number, DEVICE_NAME);
        printk(KERN_ALERT "Encrypt driver: Failed to register device class\n");
        return PTR_ERR(encrypt_class);
    }
    
    // Register the device driver
    encrypt_device = device_create(encrypt_class, NULL, MKDEV(major_number, 0), NULL, DEVICE_NAME);
    if (IS_ERR(encrypt_device)) {
        class_destroy(encrypt_class);
        unregister_chrdev(major_number, DEVICE_NAME);
        printk(KERN_ALERT "Encrypt driver: Failed to create the device\n");
        return PTR_ERR(encrypt_device);
    }
    
    printk(KERN_INFO "Encrypt driver: device class created correctly\n");
    return 0;
}

// Module cleanup function
static void __exit encrypt_exit(void) {
    // Free the message buffer if it exists
    if (message_buffer) {
        kfree(message_buffer);
    }
    
    // Remove the device
    device_destroy(encrypt_class, MKDEV(major_number, 0));
    
    // Remove the device class
    class_unregister(encrypt_class);
    class_destroy(encrypt_class);
    
    // Unregister the character device
    unregister_chrdev(major_number, DEVICE_NAME);
    
    printk(KERN_INFO "Encrypt driver: Goodbye!\n");
}

// Register the module entry and exit points
module_init(encrypt_init);
module_exit(encrypt_exit); 