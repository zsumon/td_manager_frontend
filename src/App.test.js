import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

/*
function test(rendersLearnReactLink, param2) {

}
*/

test('renders learn react link', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/TodoList Manager/i);
  expect(linkElement).toBeInTheDocument();
});
