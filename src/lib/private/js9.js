import {
    isNil
} from "ramda";


export default class JS9 {
    constructor(el, al) {
        const self = this;
        self.el = el;
        const {JS9} = window;
        const {data, custom_scripts} = al;
        self._custom_scripts = custom_scripts;
        console.log(JS9.globalOpts)
        JS9.AddDivs(el.id);
        JS9.Preload(data, {display: el.id});
    };

    update(changedProps, props) {
        const self = this;
        var js9 = self.js9;
        const {
            custom_script_calls} = changedProps;
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
