import ClubForm from '@/components/views/clubs/ClubForm';
import { testRender } from '@/helpers/testRender';
import { screen } from '@testing-library/dom';

describe('Create/Edit Club Form', () => {
  beforeEach(() => {
    testRender(<ClubForm />);
  });

  it('Render Correctly', () => {
    expect(screen.getByText('Nombre'));
  });
});

/* 
- Render correctly
- show error on throw
- handle undefined or empty data 
*/
