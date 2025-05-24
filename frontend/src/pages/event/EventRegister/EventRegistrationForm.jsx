import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_EVENTREGISTER } from '../../../features/base/config';

const EventRegistrationForm = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    event: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        const token = tokens?.access;

        const res = await axios.get(API_EVENTREGISTER.VIEW_EVENTREGISTERS, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (res.status === 200) {
          setEvents(res.data);
        }
      } catch (error) {
        console.error('Failed to load events:', error);
        setErrorMsg('⚠️ Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, event: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const token = tokens?.access;

      const res = await axios.post(
        API_EVENTREGISTER.VIEW_EVENTREGISTERS,
        { event: formData.event },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setSuccessMsg('🎉 Successfully registered for the event!');
        setFormData({ event: '' });
        navigate('/home');
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMsg('❌ Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 mt-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">📝 Register for Event</h2>

      {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Event</label>
          <select
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Choose an Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-all"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
