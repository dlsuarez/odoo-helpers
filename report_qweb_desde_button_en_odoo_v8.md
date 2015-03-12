Report qweb desde button en odoo 8.0
===

1. Crear vista de Report
---

### \# report/report\_name\_view.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<openerp>
    <data>
        <template id="report_name_view_style" inherit_id="report.layout">
            <xpath expr="//style" position="after">
                <style type="text/css">
					...
                </style>
            </xpath>
        </template>
        <template id="report_name_view_document">
            <t t-call="report.html_container">
                <t t-foreach="docs" t-as="doc">
                    <t t-call="report.external_layout">
                        <div class="page">
                            <p>
                                <span>Report number:</span>
                                <span t-field="doc.id"/>
                            </p>
                            <t t-foreach="doc._function_from_model()" t-as="record">
                                <div>
                                    <span t-esc="record['id']"/>
                                </div>
                            </t>
                        </div>
                    </t>
                </t>
            </t>
        </template>
        <template id="report_name_view">
            <t t-call="report.html_container">
                <t t-foreach="doc_ids" t-as="doc_id">
                    <t t-raw="translate_doc(doc_id, doc_model, 'lang', 'module_name.report_name_view_document')"/>
                </t>
            </t>
        </template>
    </data>
</openerp>
```

### \# \_\_init\_\_.py
```python
from . import report
```

### \# \_\_openerp\_\_.py
```python
{
	'data': [
		'report/report_name_view.xml',
	]
}
```

2. Referencia de Report desde la vista
---

### \# views/model\_name.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<openerp>
    <report
        id="report_id"
        model="model_name"
        string="Report name"
        name="module_name.report_name_view"
        file="module_name.report_name_view"
        report_type="qweb-pdf"
    />
	...
</openerp>
```

3. Definir funciónes en modelo
---

### \# models/model\_name.py
```python
from openerp import models, fields, api
from openerp.tools.translate import _

class model_name(models.TransientModel):
	_name = 'model_name'

	@api.multi
	def _function_from_model(self):
		result_array = []
        ...
		return result_array

    @api.multi
	def make_report(self):
		report_obj = self.env['report']
		report = report_obj._get_report_from_name('module_name.report_name_view')
		docargs = {
			'doc_ids': self._ids,
			'doc_model': report.model,
		}
		return {
			'type': 'ir.actions.report.xml',
			'report_name': 'module_name.report_name_view',
			'datas': docargs,
			'nodestroy': True,
		}
```

4. Añadir button y función a la que llama
---

### \# views/model\_name.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<openerp>
	<data>
        <record model="ir.ui.view" id="stats_wizard_form">
            <field name="name">stats.wizard.form</field>
            <field name="model">stats</field>
            <field name="arch" type="xml">
				...
            	<button string="Make report" name="make_report" type="object"/>
            </field>
        </record>
    </data>
</openerp>
```

5. Revisar instalación de wkhtmltopdf
---
Es necesario tener instalado el programa wkhtmltopdf
```bash
sudo wget http://sourceforge.net/projects/wkhtmltopdf/files/0.12.2.1/wkhtmltox-0.12.2.1_linux-trusty-amd64.deb 
sudo dpkg -i wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
```
En ocasiones tendremos que cambiar la ruta del programa y reiniciar odoo
```bash
sudo cp /usr/local/bin/wkhtmltopdf /usr/bin
sudo cp /usr/local/bin/wkhtmltoimage /usr/bin
```
