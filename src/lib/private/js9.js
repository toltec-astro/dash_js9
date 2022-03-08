import {
    isNil
} from "ramda";


export default class JS9Wrapper {
    constructor(el, al) {
        const self = this;
        self.el = el;
        const {data, custom_scripts} = al;
        self._custom_scripts = custom_scripts;
        console.log(JS9.globalOpts)
        console.log(el)
        JS9.AddDivs(el.id);
        self.update({
            'data': data,
        });
    };

    update(changedProps, props) {
        const self = this;
        const {
            data,
            custom_script_calls
            } = changedProps;
        console.log("update JS9")
        console.log(changedProps)
        if (!isNil(data)) {
            data.forEach(data_item => {
                console.log("data_item:", data_item);
                const {blob, options} = data_item;
                var _options = {...{onload: () => {
                   return JS9.SetZoom('toFit', {"display": self.el.id});
                }}, ...options};
                
                console.log("options:", _options)
                JS9.Load(blob, _options, {'display': self.el.id});
                JS9.SetZoom("toFit")
            });
        }
        if (!isNil(custom_script_calls)) {
            Object.keys(custom_script_calls).forEach(name => {
                var fn = self._custom_scripts[name]?.variable;
                var fn = _.get(window, fn);
                console.log("call custom script:", fn);
                fn(self, custom_script_calls[name], props);
            });
        }
    };
}
