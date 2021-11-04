/* eslint-disable i18next/no-literal-string */

import '@patternfly/react-core/dist/styles/base.css'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'

const App = lazy(() => import('./App'))

const appContainer = document.createElement('div')
document.body.appendChild(appContainer)
render(
    <Suspense fallback={<div />}>
        <App />
    </Suspense>,
    appContainer
)
