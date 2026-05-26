import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders content when open', () => {
    render(
      <Modal isOpen onClose={() => {}} title="My Modal">
        Content
      </Modal>
    );
    expect(screen.getByText('My Modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Test" />
    );
    await userEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Test" />
    );
    await userEvent.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
