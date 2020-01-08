import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import VideoPlayButton from '../components/VideoPlayButton';

describe('<VideoPlayButton />', () => {
  test('Should not break with empty props', () => {
    const component = renderer.create(<VideoPlayButton />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should NOT contain prepended style', () => {
    const component = renderer.create(<VideoPlayButton />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should contain prepended style', () => {
    const component = renderer.create(
      <VideoPlayButton style={{ color: 'red' }} />,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should call onClick when clicked', () => {
    const onClick = jest.fn();

    const component = mount(<VideoPlayButton onClick={onClick} />);

    component.simulate('mouseup');

    expect(onClick.mock.calls.length).toBe(1);
  });
});
