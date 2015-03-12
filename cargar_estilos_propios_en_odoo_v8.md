Cargar estilos propios en odoo 8.0
===

## 1. Añadir module\_name.css en la carpeta static/src/css

## 2. Insertar estilos en module\_name.css

## 3. Crear vista con el siguiente contenido:
### \# views/module\_name.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<openerp>
	<data>
    	<template id="assets_backend" name="module_name assets" inherit_id="web.assets_backend">
            <xpath expr="." position="inside">
         	   <link rel="stylesheet" href="/module_name/static/src/css/module_name.css"/>
            </xpath>
        </template>
    </data>
</openerp>
```

## 4. Cargar vista en el módulo
### \# \_\_openerp\_\_.py
```python
'data': [
	...
    'views/module_name.xml',
],
```
