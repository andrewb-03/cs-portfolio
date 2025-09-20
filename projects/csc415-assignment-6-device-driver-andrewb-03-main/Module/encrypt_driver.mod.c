#include <linux/module.h>
#include <linux/export-internal.h>
#include <linux/compiler.h>

MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};



static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0xe8213e80, "_printk" },
	{ 0x4110fbf5, "__register_chrdev" },
	{ 0x54f192b3, "class_create" },
	{ 0x52b15b3b, "__unregister_chrdev" },
	{ 0x5a863c50, "device_create" },
	{ 0x029508bc, "class_destroy" },
	{ 0xcb8b6ec6, "kfree" },
	{ 0xc8baf319, "device_destroy" },
	{ 0x029508bc, "class_unregister" },
	{ 0xd710adbf, "__kmalloc_noprof" },
	{ 0xa61fd7aa, "__check_object_size" },
	{ 0x0e9cab28, "memset" },
	{ 0xaa47b76e, "__arch_copy_from_user" },
	{ 0x9c4ed43a, "alt_cb_patch_nops" },
	{ 0xe54e0a6b, "__fortify_panic" },
	{ 0x30c65558, "strnlen" },
	{ 0xaa47b76e, "__arch_copy_to_user" },
	{ 0xbf80d1e1, "module_layout" },
};

static const u32 ____version_ext_crcs[]
__used __section("__version_ext_crcs") = {
	0xe8213e80,
	0x4110fbf5,
	0x54f192b3,
	0x52b15b3b,
	0x5a863c50,
	0x029508bc,
	0xcb8b6ec6,
	0xc8baf319,
	0x029508bc,
	0xd710adbf,
	0xa61fd7aa,
	0x0e9cab28,
	0xaa47b76e,
	0x9c4ed43a,
	0xe54e0a6b,
	0x30c65558,
	0xaa47b76e,
	0xbf80d1e1,
};
static const char ____version_ext_names[]
__used __section("__version_ext_names") =
	"_printk\0"
	"__register_chrdev\0"
	"class_create\0"
	"__unregister_chrdev\0"
	"device_create\0"
	"class_destroy\0"
	"kfree\0"
	"device_destroy\0"
	"class_unregister\0"
	"__kmalloc_noprof\0"
	"__check_object_size\0"
	"memset\0"
	"__arch_copy_from_user\0"
	"alt_cb_patch_nops\0"
	"__fortify_panic\0"
	"strnlen\0"
	"__arch_copy_to_user\0"
	"module_layout\0"
;

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "DA3813A73209366389DF4F5");
