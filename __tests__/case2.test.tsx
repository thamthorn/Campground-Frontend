import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import BookingList from '@/components/BookingList';
import { renderWithProviders } from './testutils/utils-for-tests'

describe('Booking Page', () => {
  it('Booking page get functionality', () => {
    renderWithProviders(<BookingList/>)
    expect(screen.getByText(/David/i)).toBeInTheDocument
    expect(screen.getByText(/1528420999915/i)).toBeInTheDocument 
  })
})