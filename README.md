## <img src="https://cdn.rawgit.com/piyushwalia/Brush/43d8ae14/icons/png/64x64.png" width="48">   Brush | Theme styling for Magento 2 using built-in LESS UI library 
> An electron based desktop application to style Magento 2 theme, created using built-in LESS UI library variables.

[![Version](https://img.shields.io/github/package-json/v/piyushwalia/Brush.svg)](https://github.com/piyushwalia/Brush/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/piyushwalia/Brush/total.svg)](https://github.com/piyushwalia/Brush/releases/latest)
[![License](https://img.shields.io/github/license/piyushwalia/Brush.svg)](https://github.com/piyushwalia/Brush/blob/master/LICENSE)

## Table of Contents

[Objective](#objective)<br>
[Compatibility](#compatibility)<br>
[How to Use](#how-to-use)<br>
[Features](#features)<br>
[Screenshots](#screenshots)<br>
[Future Goals](#future-goals)<br>
[Development](#development)<br>

## Objective

Brush makes Magento 2 theme styling easy by pulling all the built-in less variables in a single place (in the application). Using this, you can generate a theme.less file provided by Magento 2 to overwrite its default styling variables.

## Compatibility
Brush is compatible with Windows, Mac and Linux.
Go to the [Release](https://github.com/piyushwalia/Brush/releases) tab and download the installer for the latest release.


## How to Use

Follow these instructions to use Brush for theme styling:
1. Select Your Parent theme from LUMA or BLANK

   - Using Luma theme, you will get predefined values of variables filled in text boxes.
   - Using Blank theme, all values of variables will be blank.
2. Upload Mockup of your website in PNG or JPG format from "Upload Design" button to get color codes.
3. Enter value in textboxes as per your requirement. You can use px, em or any format.
4. :warning: Don't use semicolon at the end when entering any value as it will be added automatically.
5. Download theme.less file from "Download Theme file" button.
6. Make sure to place generated theme file under app/design/frontend/Vendor Name/Theme Name/web/css/source/ folder.  

## Features
- Color picker tool added to color variables.
- Paste previous selected color without co


## Screenshots

## Future Goals

This is version 1.0.0 of Brush. I aim to continuously evolve the application and add supplementing functionality. 

I request you all to use the application and let me know if you encounter any issues or have any queries. 

## Development
``` bash
# clone the repository
git clone https://github.com/piyushwalia/Brush

# install dependencies
npm install

# run application
npm start

```
