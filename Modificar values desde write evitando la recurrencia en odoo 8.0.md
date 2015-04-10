Modificar values desde write evitando la recurrencia en odoo 8.0
===

### \# models/model\_name.py
```python
from openerp import models, fields, api

class model_name(models.Model):

	_inherit = 'module_name.inherited_model_name

	@api.multi
	def write(self, values):
		values = self._update_values(values)
		result = super(model_name, self.sudo()).write(values)
		return result

	def _update_values(self, values):
		for record in self:
			if record['field_name'] == False:
				values.update({'field_name': True})
		return values
```
