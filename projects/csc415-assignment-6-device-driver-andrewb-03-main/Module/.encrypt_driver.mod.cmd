savedcmd_encrypt_driver.mod := printf '%s\n'   encrypt_driver.o | awk '!x[$$0]++ { print("./"$$0) }' > encrypt_driver.mod
