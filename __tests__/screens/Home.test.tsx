import React from 'react';
import {renderWithNavigatorAndRedux} from '../../helpers/renderWithNavigatorAndRedux';
import Home from '../../src/screens/Home/Home';
import {act, cleanup, screen} from '@testing-library/react-native';
import {UsersActions} from '../../src/service/users';

describe('HomeScreen Tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('Render correctly', () => {
    const tree = renderWithNavigatorAndRedux(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with data', () => {
    const data = [
      {
        id: 2280,
        name: 'Dhanadeepa Guneta',
        email: 'guneta_dhanadeepa@bayer-schmitt.net',
        gender: 'female',
        status: 'inactive',
      },
      {
        id: 2275,
        name: 'Mani Naik Esq.',
        email: 'naik_esq_mani@bergnaum-labadie.io',
        gender: 'male',
        status: 'inactive',
      },
      {
        id: 2274,
        name: 'Vaijayanthi Mishra',
        email: 'mishra_vaijayanthi@mayert.co',
        gender: 'female',
        status: 'active',
      },
      {
        id: 2273,
        name: 'Yoginder Nayar',
        email: 'yoginder_nayar@luettgen-mraz.com',
        gender: 'male',
        status: 'active',
      },
      {
        id: 2272,
        name: 'Trilok Chopra',
        email: 'chopra_trilok@lehner-hansen.name',
        gender: 'male',
        status: 'active',
      },
      {
        id: 2270,
        name: 'Balagopal Embranthiri Ret.',
        email: 'embranthiri_balagopal_ret@cormier.net',
        gender: 'female',
        status: 'active',
      },
      {
        id: 2269,
        name: 'Mrs. Shreya Deshpande',
        email: 'deshpande_shreya_mrs@konopelski.com',
        gender: 'male',
        status: 'inactive',
      },
      {
        id: 2268,
        name: 'Uttam Ahluwalia',
        email: 'ahluwalia_uttam@gislason-luettgen.org',
        gender: 'female',
        status: 'active',
      },
      {
        id: 2267,
        name: 'Aatreya Marar',
        email: 'aatreya_marar@sawayn-beahan.info',
        gender: 'female',
        status: 'inactive',
      },
      {
        id: 2266,
        name: 'Chiranjeev Reddy MD',
        email: 'chiranjeev_md_reddy@mante-bogisich.biz',
        gender: 'male',
        status: 'inactive',
      },
    ];
    renderWithNavigatorAndRedux(<Home />, store =>
      store.dispatch(UsersActions.addUsers(data)),
    );

    const list = screen.queryByTestId('flatList-user');
    expect(list?.props.data).toBe(data);
    expect(list?.props.data.length).toBe(10);
  });
});
