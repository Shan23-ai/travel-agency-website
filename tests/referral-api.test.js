const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');

const storePath = '../www/server/store';
const referralsRoutePath = '../www/server/routes/referrals';

test('referral store and API route should exist for the multi-page upgrade', async () => {
  let store;
  try {
    store = require(storePath);
  } catch (error) {
    assert.fail(`Missing store module: ${error.message}`);
  }

  let route;
  try {
    route = require(referralsRoutePath);
  } catch (error) {
    assert.fail(`Missing referrals route: ${error.message}`);
  }

  assert.ok(store.getStore, 'store should expose getStore');
  assert.ok(route, 'referrals route should load successfully');
});

test('referrals route rejects invalid bearer tokens with 401 instead of crashing', async () => {
  const app = express();
  app.use(express.json());
  app.use('/api/referrals', require(referralsRoutePath));
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Request failed' });
  });

  const server = app.listen(0);
  const port = server.address().port;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/referrals/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer invalid-token'
      },
      body: JSON.stringify({ agentId: 'agent-123' })
    });

    const body = await response.json();
    assert.equal(response.status, 401, `Expected 401 for invalid token, got ${response.status}: ${JSON.stringify(body)}`);
    assert.match(String(body.error || ''), /Invalid or expired token|Authentication required/i);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
