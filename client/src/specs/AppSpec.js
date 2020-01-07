import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';

describe('<App />', () => {
  test('Should render correctly', () => {
    const component = renderer.create(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
