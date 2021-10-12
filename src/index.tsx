/* eslint-disable i18next/no-literal-string */

import '@patternfly/react-core/dist/styles/base.css'
import { render } from 'react-dom'
import App from './App'

const appContainer = document.createElement('div')
document.body.appendChild(appContainer)
render(<App />, appContainer)
