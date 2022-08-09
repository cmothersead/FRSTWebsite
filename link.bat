set /p dir=Repository location:
cd %dir%
mklink /D infrst\UserFiles\Image images
mklink /D infrst\UserFiles\File files