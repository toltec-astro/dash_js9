# AUTO GENERATED FILE - DO NOT EDIT

djs9DashJS9 <- function(id=NULL, className=NULL, custom_script_calls=NULL, custom_scripts=NULL, data=NULL, style=NULL) {
    
    props <- list(id=id, className=className, custom_script_calls=custom_script_calls, custom_scripts=custom_scripts, data=data, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashJS9',
        namespace = 'dash_js9',
        propNames = c('id', 'className', 'custom_script_calls', 'custom_scripts', 'data', 'style'),
        package = 'dashJs9'
        )

    structure(component, class = c('dash_component', 'list'))
}
