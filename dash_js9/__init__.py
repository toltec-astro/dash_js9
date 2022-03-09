from __future__ import print_function as _

import sys as _sys
import json
from pathlib import Path
from flask import send_from_directory
import re

import dash as _dash

# noinspection PyUnresolvedReferences
from ._imports_ import *
from ._imports_ import __all__

if not hasattr(_dash, '__plotly_dash') and not hasattr(_dash, 'development'):
    print('Dash was not successfully imported. '
          'Make sure you don\'t have a file '
          'named \n"dash.py" in your current directory.', file=_sys.stderr)
    _sys.exit(1)

_basepath = Path(__file__).parent
_filepath = _basepath.joinpath("package-info.json").resolve()

with open(_filepath) as f:
    package = json.load(f)

package_name = package['name'].replace(' ', '_').replace('-', '_')
__version__ = package['version']

_this_module = _sys.modules[__name__]

async_resources = []

_js_dist = []

_js_dist.extend(
    [
        {
            "relative_package_path": "async-{}.js".format(async_resource),
            "external_url": (
                "https://unpkg.com/{0}@{2}"
                "/{1}/async-{3}.js"
            ).format(package_name, __name__, __version__, async_resource),
            "namespace": package_name,
            "async": True,
        }
        for async_resource in async_resources
    ]
)

# TODO: Figure out if unpkg link works
_js_dist.extend(
    [
        {
            "relative_package_path": "async-{}.js.map".format(async_resource),
            "external_url": (
                "https://unpkg.com/{0}@{2}"
                "/{1}/async-{3}.js.map"
            ).format(package_name, __name__, __version__, async_resource),
            "namespace": package_name,
            "dynamic": True,
        }
        for async_resource in async_resources
    ]
)

_js_dist.extend(
    [
        {
            'relative_package_path': 'third_party/js9.min.js',
            'namespace': package_name
        },
        {
            'relative_package_path': 'third_party/js9plugins.js',
            'namespace': package_name
        },
        {
            'relative_package_path': 'dash_js9.min.js',
    'external_url': 'https://unpkg.com/{0}@{2}/{1}/{1}.min.js'.format(
                package_name, __name__, __version__),
            'namespace': package_name
        },
        {
            'relative_package_path': 'dash_js9.min.js.map',
    'external_url': 'https://unpkg.com/{0}@{2}/{1}/{1}.min.js.map'.format(
                package_name, __name__, __version__),
            'namespace': package_name,
            'dynamic': True
        }
    ]
)

_css_dist = [
    {
        "relative_package_path": 'third_party/js9support.css',
        'namespace': package_name,
        },
    {
        "relative_package_path": 'third_party/js9.css',
        'namespace': package_name,
        },
    ]


for _component in __all__:
    setattr(locals()[_component], '_js_dist', _js_dist)
    setattr(locals()[_component], '_css_dist', _css_dist)


JS9_SUPPORT = "https://js9.si.edu/js9/js9support.min.js"


def _join_url(*parts):
    return re.sub("(?<!http:)//+", "/", '/'.join(parts))


def setup_js9(app, config_path=None, install_dir=None, js9prefs=None):
    
    if config_path is not None:
        if install_dir is not None or js9prefs is not None:
            raise ValueError("can either set config path or the config items")
        with open(config_path, 'r') as fo:
            cfg = json.load(fo)
            return setup_js9(
                app,
                install_dir=cfg.get('install_dir', None),
                js9prefs=cfg.get('js9prefs', None),
                )
    if install_dir is None:
        install_dir = '.'
    install_dir = Path(install_dir)

    # resolve the url for dash routes prefix
    routes_prefix = app.config.routes_pathname_prefix or ''
    _helper_url_stem = '/js9_helper'
    _css_url_stem = f'/_dash-component-suites/{package_name}/third_party/assets'

    @app.server.route(
         _join_url(routes_prefix, _helper_url_stem, '<path:item>'),
        endpoint='js9_helper')
    def js9_helper(item):
        return send_from_directory(install_dir, item)

    @app.server.route(
        _join_url(routes_prefix, _css_url_stem, '<path:item>'),
        endpoint='css_assets')
    def css_assets(item):
        return send_from_directory(install_dir, item)
    
    # overwrite the jsprefs such that the install dir is set to the
    # proper route
    # we then add the route to external scripts of the app
    _js9prefs = {
        "globalOpts": {
            "helperType":       "nodejs",
            "helperPort":       2718,
            "helperCGI":        "./cgi-bin/js9/js9Helper.cgi",
            "debug":            0,
            "loadProxy":        True,
            "workDir":          "./tmp",
            "workDirQuota":     100,
            "dataPath":         "$HOME/Desktop:$HOME/data",
            "analysisPlugins":  "./analysis-plugins",
            "analysisWrappers": "./analysis-wrappers",
            },
        "imageOpts": {
            "colormap":         "grey",
            "scale":            "linear"
            }
        }
    # merge any custom settings in js9prefs
    if js9prefs is not None:
        for k in _js9prefs.keys():
            _js9prefs[k].update(js9prefs.get(k, dict()))
    # set install dir
    _js9prefs['globalOpts']['installDir'] = _join_url(routes_prefix, _helper_url_stem)
    
    # serve the js9prefs.js file
    js9prefs_content = f"""var JS9Prefs = {json.dumps(_js9prefs)};"""

    js9prefs_url = _join_url(routes_prefix, 'js9prefs.js')

    @app.server.route(
        js9prefs_url, endpoint='js9prefs')
    def prefs():
        return js9prefs_content, 200, {'Content-Type': 'text/javascript'}
    
    app.config.external_scripts.append(js9prefs_url)