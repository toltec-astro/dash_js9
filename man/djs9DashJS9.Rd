% Auto-generated: do not edit by hand
\name{djs9DashJS9}

\alias{djs9DashJS9}

\title{DashJS9 component}

\description{
DashJS9.
}

\usage{
djs9DashJS9(id=NULL, className=NULL, custom_script_calls=NULL,
custom_scripts=NULL, data=NULL, style=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{className}{Character. The class of the container.}

\item{custom_script_calls}{Named list. Custom script calls to make. The keys should match those in
``custom_script``, and the vialues are passed to
``custom_scripts``.}

\item{custom_scripts}{Named list. Custom scripts to be used in ``custom_script_calls``.
The values are inline functions that have signature like
``function(aladin, data, props)``, where data are
passed in ``custom_script_calls``.}

\item{data}{List of lists containing elements 'blob', 'options'.
those elements have the following types:
  - blob (character; optional)
  - options (named list; optional)s. The data to load.}

\item{style}{Named list. The style of the container.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

