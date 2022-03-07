# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashJS9(Component):
    """A DashJS9 component.
DashJS9.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; optional):
    The class of the container.

- custom_script_calls (dict; optional):
    Custom script calls to make. The keys should match those in
    ``custom_script``, and the vialues are passed to
    ``custom_scripts``.

- custom_scripts (dict; optional):
    Custom scripts to be used in ``custom_script_calls``. The values
    are inline functions that have signature like ``function(aladin,
    data, props)``, where data are passed in ``custom_script_calls``.

- data (string; default 'js9_helper/data.fits'):
    The data to load.

- style (dict; optional):
    The style of the container."""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, className=Component.UNDEFINED, style=Component.UNDEFINED, data=Component.UNDEFINED, custom_scripts=Component.UNDEFINED, custom_script_calls=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'custom_script_calls', 'custom_scripts', 'data', 'style']
        self._type = 'DashJS9'
        self._namespace = 'dash_js9'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'custom_script_calls', 'custom_scripts', 'data', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DashJS9, self).__init__(**args)
