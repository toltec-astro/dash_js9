import React, {Component} from 'react';
import ResizeDetector from 'react-resize-detector/build/withPolyfill';
import PropTypes from 'prop-types';
import JS9Wrapper from '../private/js9'

/**
 * DashJS9.
 */
export default class DashJS9 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            js9_loaded: false
          };
        this.js9c = React.createRef();
        this.js9Resize = this.js9Resize.bind(this);
    }
    componentDidMount() {
        $(document).on("JS9:ready", () => {
            console.log("JS9 initialized")
            console.log(JS9)
            this.setState({
                "js9_loaded": true
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // create js9 wrapper upon ready
        if (this.state.js9_loaded && !prevState.js9_loaded) {
            console.log("create JS9 wrapper")
            this.js9wrapper = new JS9Wrapper(this.js9c.current, this.props)
        }
        var changedProps = {};
        // console.log("prevProps")
        // console.log(prevProps.data)
        // console.log("thisProps")
        // console.log(this.props.data)
        if (JSON.stringify(this.props.data) != JSON.stringify(prevProps.data)) {
            changedProps.data = this.props.data;
        }
        if (this.js9wrapper) {
            console.log("js9wrapper.update")
            this.js9wrapper.update(changedProps, this.props);
        } else {
            console.log("js9wrapper not created")
        }
    }

    js9Resize(width, height) {
        console.log("resize:", width, height);
        const js9c = this.js9c.current;
        if (!js9c) {
            return;
        }
        if (this.state.js9_loaded) {
            JS9.ResizeDisplay(width, height,  null,  {display: js9c.id});
        }
    }

    render() {
        const {id, className, style, loading_state} = this.props;
        console.log("render with props/states")
        console.log(this.props)
        console.log(this.state)
        if (this.state.js9_loaded) {
            return <div
                    id={id}
                    key={id}
                    data-dash-is-loading={
                        (loading_state && loading_state.is_loading) || undefined 
                    }
                    className={className}
                    style={style}
                    >
                        <ResizeDetector
                        handleHeight={true}
                        handleWidth={true}
                        refreshMode="debounce"
                        refreshOptions={{trailing: true}}
                        refreshRate={50}
                        onResize={this.js9Resize}
                        />
                        <div
                        id={id + '-js9Menubar'}
                        className="JS9Menubar"
                        data-width="100%"
                        />
                        <div
                        id={id + '-js9'}
                        className="JS9"
                        ref={this.js9c}
                        data-width="100%"
                        data-height="512px"
                        style={{'maxHeight': '80vh'}}
                        />
                        <div
                        id={id + '-js9Colorbar'}
                        className="JS9Colorbar"
                        data-width="100%"
                        />
                    </div>
        } else {
            return <div id={id} key={id} className={className} style={style}><div className='label'>JS9 is Initializing ...</div></div>
        }
    }

}

DashJS9.defaultProps = {

    // data: [{
    //     "blob": 'js9_helper/data.fits'
    // }]
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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            'blob': PropTypes.string,
            "options": PropTypes.object
        })
    ),

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
