Crear wizard en odoo 8.0
===

1. Crear Wizard
---

### \# \_\_init\_\_.py
```python
from . import wizards
```

### \# \_\_openerp\_\_.py
```python
{
	'data': [
		'wizards/wizard_name_view.xml',
	]
}
```

### \# wizards/wizard\_name.py
```python
from openerp import models, fields, api
from openerp.tools.translate import _
from datetime import date, datetime, timedelta

class model_name(models.TransientModel):
    _name = 'model.name'
	...
```

### \# wizards/\_\_init\_\_.py
```python
from . import wizard_name
```

### \# wizards/wizard\_name\_view.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<openerp>
    <data>
        <record model="ir.ui.view" id="model_wizard_form">
            <field name="name">model.wizard.form</field>
            <field name="model">model.name</field>
            <field name="arch" type="xml">
                <form string="Form Name" version="8.0" groups="module_name.a_module_group">
                ...
                </form>
            </field>
        </record>
    </data>
</openerp>
```


2. Crear un menuitem u otro elemento que llame al report asociado al wizard:
---

### \# \_\_openerp\_\_.py
```python
{
	‘data’: [
		'views/menus_menu.xml',
	]
}
```

### # views/menus\_menu.xml
```xml
<record id="record_id" model="ir.actions.act_window">
    <field name="name">Record Name</field>
    <field name="type">ir.actions.act_window</field>
    <field name="res_model">model.name</field>
    <field name="view_type">form</field>
    <field name="view_mode">form</field>
    <field name="target">inline</field>
    <!-- Muestra el menú en la misma ventana sin botones nuevo y modificar -->
    <!-- <field name="target">current</field> -->
    <!-- Muestra el menú en la misma ventana pero con botones nuevo y modificar -->
    <!-- <field name="target">new</field> -->
    <!-- Muestra el menú en una ventana modal nueva -->
</record>

<menuitem id="menuitem_id"
    name="Menuitem Name"
    parent="parent_menu_id"
    sequence="10"
    action="module_name.record_id"
    groups="module_name.a_module_group"
/>
```
