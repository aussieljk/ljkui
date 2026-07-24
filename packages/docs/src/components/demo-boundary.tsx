import * as React from 'react';

/**
 * Isolates one live demo. Demos are real component trees rendered straight from the package, so a
 * genuine library bug throws during render — and without a boundary that error propagates to the
 * router's catch boundary and blanks the whole route. On the landing page that means one broken
 * component hides the other ninety.
 *
 * The failure is shown rather than swallowed: a silently empty preview reads as "no demo yet".
 */
export class DemoBoundary extends React.Component<
  { children: React.ReactNode; name: string; compact?: boolean },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.compact) {
      return <span className="text-xs text-fd-muted-foreground">Demo failed to render</span>;
    }

    return (
      <div className="text-sm text-fd-muted-foreground">
        <p className="font-medium text-fd-foreground">This demo failed to render.</p>
        <p className="mt-1">
          <code className="font-mono text-xs">{this.props.name}</code> — {error.message}
        </p>
      </div>
    );
  }
}
