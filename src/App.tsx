/* eslint-disable react/display-name */
import { Page, PageSection } from '@patternfly/react-core'

export default function App(): JSX.Element {
    return (
        <Page style={{ height: '100vh' }}>
            <PageSection isWidthLimited isFilled>
                Page Section
            </PageSection>
        </Page>
    )
}
