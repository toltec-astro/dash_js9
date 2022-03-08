# AUTO GENERATED FILE - DO NOT EDIT

export djs9_dashjs9

"""
    djs9_dashjs9(;kwargs...)

A DashJS9 component.
DashJS9.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `className` (String; optional): The class of the container.
- `custom_script_calls` (Dict; optional): Custom script calls to make. The keys should match those in
``custom_script``, and the vialues are passed to
``custom_scripts``.
- `custom_scripts` (Dict; optional): Custom scripts to be used in ``custom_script_calls``.
The values are inline functions that have signature like
``function(aladin, data, props)``, where data are
passed in ``custom_script_calls``.
- `data` (optional): The data to load.. data has the following type: Array of lists containing elements 'blob', 'options'.
Those elements have the following types:
  - `blob` (String; optional)
  - `options` (Dict; optional)s
- `style` (Dict; optional): The style of the container.
"""
function djs9_dashjs9(; kwargs...)
        available_props = Symbol[:id, :className, :custom_script_calls, :custom_scripts, :data, :style]
        wild_props = Symbol[]
        return Component("djs9_dashjs9", "DashJS9", "dash_js9", available_props, wild_props; kwargs...)
end

