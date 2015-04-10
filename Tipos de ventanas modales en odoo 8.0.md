Tipos de ventanas modales
===

## Warning genérico
```python
from openerp.tools.translate import _
from openerp.exceptions import Warning
...
raise Warning(_('This is a message'))
```

## Warning con redirección
```python
from openerp.tools.translate import _
from openerp.exceptions import Warning
...
msg = _('This is a message')
action = self.env.ref('module_name.xml_id')
msg_link = _('This is a link')
raise RedirectWarning(msg, action.id, msg_link)
```

## Llamada desde button
```python
from openerp.tools.translate import _
...
return {
    'type': 'ir.actions.client',
    'tag': 'action_notify',
    'name': _('Name'),
    'params': {
        'title': _('Title'),
        'text': _('This is a message'),
        'sticky': True
    }
}
```

## Llamada desde onchange
```python
from openerp.tools.translate import _
...
return {
    'warning': {
        'title': _('Title'),
        'message': _('This is a message')
    }
}
```
