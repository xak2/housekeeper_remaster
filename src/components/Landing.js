import React from 'react'
import { CompoundButton } from 'office-ui-fabric-react'
import { Stack } from 'office-ui-fabric-react'
import Logo from '../media/logo.png'

const Landing = () => (
  <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={{ root: { width: '600px', margin: '0 auto', textAlign: 'center', color: '#605e5c' } }} tokens={{ childrenGap: 15 }}>
    <img src={Logo} alt="Frame House" width="200" />
    <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
      <CompoundButton href="/signin" iconProps={{ iconName: 'Manufacturing' }} primary={true} secondaryText="Sign in to houses management app.">
        For Staff
      </CompoundButton>
      <CompoundButton href="/track" iconProps={{ iconName: 'People' }} primary={true} secondaryText="Enter project reference number to view details.">
        For Customers
      </CompoundButton>
    </Stack>
  </Stack>
);

export default Landing