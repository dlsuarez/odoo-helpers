Modificar dominio desde python en odoo 8.0 (alternativa a modificar el dominio de usuarios para una regla)
===

## 1. Usar model ir.actions.server en vez de ir.actions.act\_window
### \# views/model\_name.xml
```xml
<record id="crm_case_category_act_server_oppor11" model="ir.actions.server">
    <field name="name">Record name</field>
    <field name="model_id" ref="module_name.model_model_name"/>
    <field name="condition">True</field>
    <field name="code">
        action = {
            "type": "ir.actions.act_window",
            "view_mode": "kanban,tree,graph,form,calendar",
            "res_model": "model.name",
            "domain": unicode(self._set_domain(cr, uid, context)),
        }
    </field>
</record>
```

## 2. Devolver dominio en python desde función
### \# models/model\_name.py
```python
from openerp import models, fields, api
from ast import literal_eval

class model_name(models.Model):
	...
	@api.multi
    def _compute_user_hierarchy_domain(self):
        current_user = self.env['res.users'].search([("id", "=", self.env.uid)])[0]
        domain = []
        if self._check_user_group(current_user, 'group_1'):
            domain = [
				...
            ]
        elif self._check_user_group(current_user, 'group_2'):
            domain = [
				...
            ]
        users = self.env['res.users'].search(domain)
        users_for_domain = [user.id for user in users]
        users_for_domain.append(current_user.id)
        domain = [('user_id', 'in', users_for_domain)]
        return domain
```
