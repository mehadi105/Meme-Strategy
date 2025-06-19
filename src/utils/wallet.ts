// Wallet connection utility for MetaMask
export interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  error: string | null;
}

export class WalletManager {
  private static instance: WalletManager;
  private state: WalletState = {
    isConnected: false,
    account: null,
    chainId: null,
    error: null
  };

  private listeners: ((state: WalletState) => void)[] = [];

  static getInstance(): WalletManager {
    if (!WalletManager.instance) {
      WalletManager.instance = new WalletManager();
    }
    return WalletManager.instance;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: WalletState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): WalletState {
    return { ...this.state };
  }

  private setState(updates: Partial<WalletState>) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  async connect(): Promise<boolean> {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        this.setState({ error: 'MetaMask is not installed. Please install MetaMask to continue.' });
        return false;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts && accounts.length > 0) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        this.setState({
          isConnected: true,
          account: accounts[0],
          chainId,
          error: null
        });

        // Set up event listeners
        this.setupEventListeners();
        
        return true;
      } else {
        this.setState({ error: 'No accounts found' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.code === 4001 
        ? 'User rejected the connection request' 
        : error.message || 'Failed to connect wallet';
      
      this.setState({ error: errorMessage });
      return false;
    }
  }

  async disconnect(): Promise<void> {
    this.setState({
      isConnected: false,
      account: null,
      chainId: null,
      error: null
    });
  }

  private setupEventListeners() {
    if (!window.ethereum) return;

    // Handle account changes
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.setState({
          isConnected: false,
          account: null,
          chainId: null
        });
      } else {
        this.setState({ account: accounts[0] });
      }
    });

    // Handle chain changes
    window.ethereum.on('chainChanged', (chainId: string) => {
      this.setState({ chainId });
    });

    // Handle disconnect
    window.ethereum.on('disconnect', () => {
      this.setState({
        isConnected: false,
        account: null,
        chainId: null
      });
    });
  }

  async checkConnection(): Promise<boolean> {
    if (!window.ethereum) return false;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts && accounts.length > 0) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        this.setState({
          isConnected: true,
          account: accounts[0],
          chainId,
          error: null
        });
        this.setupEventListeners();
        return true;
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }

    return false;
  }

  getShortAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}

// Global wallet manager instance
export const walletManager = WalletManager.getInstance();

// TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
} 