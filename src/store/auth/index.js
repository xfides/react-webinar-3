import StoreModule from '../module';

class AuthState extends StoreModule {
  KEY = 'AUTH';

  initState() {
    return {
      waiting: false,
      token: this.getAuthFromStorage()?.token || '',
      lastError: '',
      profile: {
        name: this.getAuthFromStorage()?.name || '',
        phone: '',
        email: '',
      },
    };
  }

  async signOut() {
    this.setState({ ...this.getState(), waiting: true }, 'auth sign out / start request');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token,
        },
      });

      const responseResult = await response.json();

      if (responseResult?.result) {
        this.deleteAuthFromStorage();
        this.setState({ ...this.initState() }, 'auth sign out / finish request / success');
      }

      if (responseResult?.error) {
        this.setState(
          {
            ...this.getState(),
            waiting: false,
            lastError: this.parseResponseError(responseResult),
          },
          'auth sign out / finish request / error',
        );
      }
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          lastError: typeof err === 'string' ? err : err.message,
        },
        `auth sign out / finish request / error`,
      );
    }
  }

  async signIn({ login, password }) {
    this.setState({ ...this.initState(), waiting: true }, 'auth sign in / start request');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const responseResult = await response.json();
      const newAuthState = this.parseResponseSignIn(responseResult);

      if (newAuthState.token) this.setAuthToStorage(newAuthState);

      this.setState(
        newAuthState,
        `auth sign in / finish request / ${newAuthState.lastError ? 'error' : 'success'}`,
      );
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          lastError: typeof err === 'string' ? err : err.message,
        },
        `auth sign in / finish request / error`,
      );
    }
  }

  async getUserProfile() {
    this.setState({ ...this.getState(), waiting: true }, 'getUserProfile / start request');

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token,
        },
      });

      const responseResult = await response.json();

      if (responseResult.result) {
        const newUserInfo = this.parseResponseUserInfo(responseResult.result);

        this.setState(
          {
            ...this.getState(),
            lastError: '',
            waiting: false,
            profile: newUserInfo,
          },
          'getUserProfile / finish request / success',
        );
      }

      if (responseResult.error) {
        this.setState(
          {
            ...this.getState(),
            lastError: this.parseResponseError(responseResult),
            waiting: false,
          },
          'getUserProfile / finish request / error',
        );
      }
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          lastError: typeof err === 'string' ? err : err.message,
        },
        `getUserProfile / finish request / error`,
      );
    }
  }

  parseResponseError(responseError) {
    return (
      responseError.error?.data?.issues?.[0]?.message ||
      responseError.error?.message ||
      'unknown error'
    );
  }

  parseResponseUserInfo(responseUserInfo) {
    return {
      name: responseUserInfo?.profile?.name || 'Unknown user',
      phone: responseUserInfo?.profile?.phone || '',
      email: responseUserInfo?.email || '',
    };
  }

  parseResponseSignIn(responseSignIn) {
    if (responseSignIn.result)
      return {
        waiting: false,
        token: responseSignIn.result.token,
        lastError: '',
        profile: {
          ...this.getState().profile,
          name: this.parseResponseUserInfo(responseSignIn.result.user).name,
        },
      };

    if (responseSignIn.error)
      return {
        waiting: false,
        token: '',
        lastError: this.parseResponseError(responseSignIn),
        profile: { ...this.getState().profile, name: '' },
      };
  }

  setAuthToStorage(appAuthState) {
    const authStorageInfo = {
      token: appAuthState.token,
      name: appAuthState.profile.name,
    };

    localStorage.setItem(this.KEY, JSON.stringify(authStorageInfo));
  }

  getAuthFromStorage() {
    const authInfo = localStorage.getItem(this.KEY);

    try {
      return JSON.parse(authInfo);
    } catch (_) {
      return null;
    }
  }

  deleteAuthFromStorage() {
    localStorage.clear();
  }
}

export default AuthState;
