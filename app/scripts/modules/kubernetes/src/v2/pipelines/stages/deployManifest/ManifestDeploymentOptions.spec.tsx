import * as React from 'react';
import { shallow } from 'enzyme';

import { StageConfigField } from '@spinnaker/core';

import {
  IManifestDeploymentOptionsProps,
  ManifestDeploymentOptions,
  defaultTrafficManagementConfig,
} from './ManifestDeploymentOptions';

describe('<ManifestDeploymentOptions />', () => {
  const onConfigChangeSpy = jasmine.createSpy('onConfigChangeSpy');
  let wrapper: any;
  let props: IManifestDeploymentOptionsProps;

  beforeEach(() => {
    props = {
      accounts: [],
      config: defaultTrafficManagementConfig,
      onConfigChange: onConfigChangeSpy,
      selectedAccount: null,
    };
    wrapper = shallow(<ManifestDeploymentOptions {...props} />);
  });

  describe('view', () => {
    it('renders only the enable checkbox when config is disabled', () => {
      expect(wrapper.find(StageConfigField).length).toEqual(1);
      expect(wrapper.find('input[type="checkbox"]').length).toEqual(1);
    });
    it('renders config fields for `namespace`, `services`, and `enableTraffic` when config is enabled', () => {
      props.config.enabled = true;
      wrapper = shallow(<ManifestDeploymentOptions {...props} />);
      expect(wrapper.find(StageConfigField).length).toEqual(4);
    });
  });

  describe('functionality', () => {
    it('updates `config.enabled` when enable checkbox is toggled', () => {
      wrapper
        .find('input[type="checkbox"]')
        .at(0)
        .simulate('change', { target: { checked: true } });
      expect(onConfigChangeSpy).toHaveBeenCalledWith({
        ...defaultTrafficManagementConfig,
        enabled: true,
      });
    });
  });
});
