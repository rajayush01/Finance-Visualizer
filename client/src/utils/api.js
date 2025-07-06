const getApiUrl = () => {
  try {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  } catch (error) {
    return 'http://localhost:5000';
  }
};

const handleApiError = async (response) => {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const error = await response.json();
      errorMessage = error.error || errorMessage;
    } catch (e) {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
  return response;
};

// Transaction API functions
export const fetchTransactions = async () => {
  try {
    const API = getApiUrl();
    const res = await fetch(`${API}/transactions`);
    await handleApiError(res);
    return await res.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const createTransaction = async (data) => {
  try {
    const API = getApiUrl();
    const res = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await handleApiError(res);
    return await res.json();
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const API = getApiUrl();
    const res = await fetch(`${API}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await handleApiError(res);
    return await res.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const API = getApiUrl();
    const res = await fetch(`${API}/transactions/${id}`, {
      method: 'DELETE'
    });
    await handleApiError(res);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const fetchBudgets = async () => {
  try {
    const API = getApiUrl();
    const res = await fetch(`${API}/budgets`);
    await handleApiError(res);
    return await res.json();
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

export const setCategoryBudget = async (data) => {
  try {
    const API = getApiUrl();
    const res = await fetch(`${API}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await handleApiError(res);
    return await res.json();
  } catch (error) {
    console.error('Error setting budget:', error);
    throw error;
  }
};