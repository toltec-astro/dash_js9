import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JS9 from '../private/js9'

/**
 * DashJS9.
 */
export default class DashJS9 extends Component {
    constructor(props) {
        super(props);
        this.js9c = React.createRef();
    }
    componentDidMount() {
        this.js9 = new JS9 (
            this.js9c.current, this.props);
    }

    componentDidUpdate(prevProps) {
        var changedProps = {};
        this.js9.update(changedProps, this.props);
    }

    render() {
        const {id, className, style, loading_state} = this.props;
        console.log("this.props")
        console.log(this.props)
        return <div
                id={id}
                key={id}
                data-dash-is-loading={
                    (loading_state && loading_state.is_loading) || undefined
                }
                className={className}
                style={style}
                >
                    <div
                    id={id + '-js9Menubar'}
                    className="JS9Menubar"
                    />
                    <div
                    id={id + '-js9'}
                    className="JS9"
                    ref={this.js9c}
                    />
                    <div
                    id={id + '-js9Colorbar'}
                    className="JS9Colorbar"
                    />
                </div>
    }

}

DashJS9.defaultProps = {

    data: 'js9_helper/data.fits'
};

DashJS9.propTypes = {

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The class of the container.
     */
    className: PropTypes.string,

    /**
     * The style of the container.
     */
    style: PropTypes.object,

    /**
     * The data to load.
     */
    data: PropTypes.string,

    /**
     * Custom scripts to be used in ``custom_script_calls``.
     * The values are inline functions that have signature like
     * ``function(aladin, data, props)``, where data are
     * passed in ``custom_script_calls``.
     */
    custom_scripts: PropTypes.object,

    /**
     * Custom script calls to make. The keys should match those in
     * ``custom_script``, and the vialues are passed to
     * ``custom_scripts``.
     */
    custom_script_calls: PropTypes.object,
};
