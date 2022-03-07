
module DashJs9
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("djs9_dashjs9.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_js9",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "third_party/js9prefs.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "third_party/js9support.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "third_party/js9.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "third_party/js9plugins.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_js9.min.js",
    external_url = "https://unpkg.com/dash_js9@0.0.1/dash_js9/dash_js9.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_js9.min.js.map",
    external_url = "https://unpkg.com/dash_js9@0.0.1/dash_js9/dash_js9.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "third_party/js9.css",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :css
),
DashBase.Resource(
    relative_package_path = "third_party/js9support.css",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :css
)
            ]
        )

    )
end
end
