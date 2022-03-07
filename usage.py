import dash_js9
import dash
from dash import Input, Output, html
import yaml

app = dash.Dash(__name__)

dash_js9.setup_js9_helper(app)

app.layout = html.Div([
    dash_js9.DashJS9(
        id='js9',
    ),
    html.Pre(id='output')
])


@app.callback(
    Output('output', 'children'), inputs={
        k: Input('js9', k)
        for k in [
            'id', 'className', 'style', 'data'
            ]})
def display_output(**kwargs):
    return yaml.dump(kwargs)


if __name__ == '__main__':
    app.run_server(debug=True)
