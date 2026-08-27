import { createClient } from '@supabase/supabase-js';
import { BookingFormData } from '../types';

export const SUPABASE_PROJECT_ID = 'dxovlmkmtazaotqmbyjs';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_xk6XyEA97_gYhr_WNHtPeA_jvJo1RDO';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface StoredBooking {
  id?: string;
  created_at?: string;
  guest_name: string;
  phone_number: string;
  email_address?: string;
  check_in: string;
  check_out: string;
  guests: number;
  rooms: number;
  room_type: string;
  total_price: number;
  special_requests?: string;
  status?: string;
}

export const SUPABASE_SQL_SCHEMA = `-- Copy & run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)

create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  guest_name text not null,
  phone_number text not null,
  email_address text,
  check_in date not null,
  check_out date not null,
  guests integer default 1,
  rooms integer default 1,
  room_type text not null,
  total_price numeric,
  special_requests text,
  status text default 'pending'
);

-- Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Allow public anonymous guest submissions
create policy "Allow public bookings insertion"
on public.bookings
for insert
to anon, authenticated
with check (true);

-- Allow reading bookings
create policy "Allow reading bookings"
on public.bookings
for select
to anon, authenticated
using (true);
`;

/**
 * Saves a new booking appointment to Supabase and saves a local copy as backup
 */
export async function saveBookingToSupabase(
  formData: BookingFormData,
  calculatedEstimate: { nights: number; rate: number; total: number }
): Promise<{ success: boolean; data?: any; error?: string; isLocalFallback?: boolean }> {
  const newRecord: StoredBooking = {
    guest_name: formData.guestName,
    phone_number: formData.phoneNumber,
    email_address: formData.emailAddress || '',
    check_in: formData.checkIn,
    check_out: formData.checkOut,
    guests: Number(formData.guests),
    rooms: Number(formData.rooms),
    room_type: formData.roomType,
    total_price: calculatedEstimate.total,
    special_requests: formData.specialRequests || '',
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  // 1. Local backup in browser storage
  try {
    const existingRaw = localStorage.getItem('hotel_mazing_bookings');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift({ ...newRecord, id: `local-${Date.now()}` });
    localStorage.setItem('hotel_mazing_bookings', JSON.stringify(existing.slice(0, 100)));
  } catch (err) {
    console.warn('Could not save local backup:', err);
  }

  // 2. Insert into Supabase table 'bookings'
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          guest_name: newRecord.guest_name,
          phone_number: newRecord.phone_number,
          email_address: newRecord.email_address,
          check_in: newRecord.check_in,
          check_out: newRecord.check_out,
          guests: newRecord.guests,
          rooms: newRecord.rooms,
          room_type: newRecord.room_type,
          total_price: newRecord.total_price,
          special_requests: newRecord.special_requests,
          status: newRecord.status,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert notice:', error);
      // Even if table does not exist or RLS needs permission, return clear notice
      return {
        success: true,
        isLocalFallback: true,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
      isLocalFallback: false,
    };
  } catch (err: any) {
    console.error('Supabase connection error:', err);
    return {
      success: true,
      isLocalFallback: true,
      error: err?.message || 'Connection error',
    };
  }
}

/**
 * Fetches all stored bookings from Supabase (with fallback to local storage)
 */
export async function fetchAllBookings(): Promise<{
  bookings: StoredBooking[];
  source: 'supabase' | 'local';
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return {
        bookings: data as StoredBooking[],
        source: 'supabase',
      };
    }

    if (error) {
      console.warn('Supabase fetch error, checking local store:', error.message);
    }
  } catch (err: any) {
    console.warn('Supabase fetch exception:', err);
  }

  // Fallback to local storage
  try {
    const existingRaw = localStorage.getItem('hotel_mazing_bookings');
    const localBookings = existingRaw ? JSON.parse(existingRaw) : [];
    return {
      bookings: localBookings,
      source: 'local',
    };
  } catch {
    return {
      bookings: [],
      source: 'local',
    };
  }
}
