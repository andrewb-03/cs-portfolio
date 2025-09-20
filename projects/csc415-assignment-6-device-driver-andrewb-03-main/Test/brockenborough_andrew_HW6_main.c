/**************************************************************
* Class::  CSC-415-01 Summer 2025
* Name:: Andrew Brockenborough
* Student ID:: 921749371
* GitHub-Name:: andrewb-03
* Project:: Assignment 6 – Device Driver
*
* File:: brockenborough_andrew_HW6_main.c
*
* Description:: This program tests the encryption/decryption device driver.
* It demonstrates loading, using, and unloading the driver with an interactive
* menu system for testing encryption, decryption, and key management.
*
**************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <unistd.h>

// IOCTL commands (must match the driver).
#define ENCRYPT_MODE 0
#define DECRYPT_MODE 1
#define SET_KEY 2

// Devices file path.
#define DEVICE_PATH "/dev/encrypt_dev"

// Function prototypes.
void test_encryption(int fd);
void test_decryption(int fd);
void test_key_change(int fd);
void print_menu(void);

int main() {
    int fd;
    char choice;
    
    printf("=== CSC415 Assignment 6 - Device Driver Test ===\n");
    printf("Testing encryption/decryption device driver\n\n");
    
    // Opens the device file.
    fd = open(DEVICE_PATH, O_RDWR);
    if (fd < 0) {
        printf("Error: Could not open device file %s\n", DEVICE_PATH);
        printf("Make sure the driver is loaded: sudo insmod Module/encrypt_driver.ko\n");
        return -1;
    }
    
    printf("Successfully opened device driver\n");
    
    // Main test loop.
    do {
        print_menu();
        printf("Enter your choice: ");
        scanf(" %c", &choice);
        getchar(); // Clears newline.
        
        switch (choice) {
            case '1':
                test_encryption(fd);
                break;
            case '2':
                test_decryption(fd);
                break;
            case '3':
                test_key_change(fd);
                break;
            case '4':
                printf("Exiting...\n");
                break;
            default:
                printf("Invalid choice. Please try again.\n");
        }
        
        printf("\n");
    } while (choice != '4');
    
    // Closes the device file.
    close(fd);
    printf("Device file closed\n");
    
    return 0;
}

// Tests encryption functionality.
void test_encryption(int fd) {
    char input[256];
    char output[256];
    int result;
    
    printf("\n--- Testing Encryption ---\n");
    
    // Sets to encrypt mode.
    if (ioctl(fd, ENCRYPT_MODE, 0) < 0) {
        printf("Error: Failed to set encrypt mode\n");
        return;
    }
    printf("Set to ENCRYPT mode\n");
    
    // Gets input from user.
    printf("Enter a string to encrypt: ");
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = 0; // Removes newline.
    
    // Writes to device (this will encrypt the string).
    result = write(fd, input, strlen(input));
    if (result < 0) {
        printf("Error: Failed to write to device\n");
        return;
    }
    printf("Wrote %d bytes to device\n", result);
    
    // Small delay to ensure processing is complete or else will possibly return blank.
    usleep(1000); // 1ms delay.
    
    // Reads from device (this will get the encrypted string).
    result = read(fd, output, sizeof(output) - 1);
    if (result < 0) {
        printf("Error: Failed to read from device\n");
        return;
    }
    output[result] = '\0';
    
    printf("Original string: %s\n", input);
    printf("Encrypted string: %s\n", output);
}

// Tests the decryption functionality.
void test_decryption(int fd) {
    char input[256];
    char output[256];
    int result;
    
    printf("\n--- Testing Decryption ---\n");
    
    // Sets to decrypt mode.
    if (ioctl(fd, DECRYPT_MODE, 0) < 0) {
        printf("Error: Failed to set decrypt mode\n");
        return;
    }
    printf("Set to DECRYPT mode\n");
    
    // Gets input from user.
    printf("Enter an encrypted string to decrypt: ");
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = 0; // Removes newline.
    
    // Writes to device (this will decrypt the string).
    result = write(fd, input, strlen(input));
    if (result < 0) {
        printf("Error: Failed to write to device\n");
        return;
    }
    printf("Wrote %d bytes to device\n", result);

    usleep(1000);
    
    // Reads from device (this will get the decrypted string).
    result = read(fd, output, sizeof(output) - 1);
    if (result < 0) {
        printf("Error: Failed to read from device\n");
        return;
    }
    output[result] = '\0';
    
    printf("Encrypted string: %s\n", input);
    printf("Decrypted string: %s\n", output);
}

// Tests changing the encryption key.
void test_key_change(int fd) {
    int new_key;
    
    printf("\n--- Testing Key Change ---\n");
    
    printf("Enter new encryption key (1-25): ");
    scanf("%d", &new_key);
    getchar(); // Clears newline.
    
    if (new_key < 1 || new_key > 25) {
        printf("Error: Key must be between 1 and 25\n");
        return;
    }
    
    // Sets the new key.
    if (ioctl(fd, SET_KEY, new_key) < 0) {
        printf("Error: Failed to set new key\n");
        return;
    }
    
    printf("Successfully changed encryption key to %d\n", new_key);
}

// Prints the main menu.
void print_menu(void) {
    printf("\n=== Device Driver Test Menu ===\n");
    printf("1. Test Encryption\n");
    printf("2. Test Decryption\n");
    printf("3. Change Encryption Key\n");
    printf("4. Exit\n");
} 