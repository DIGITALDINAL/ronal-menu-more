import React from 'react';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground mt-16 border-t border-border">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Ronal's Menu & More. All Rights Reserved.
        </p>
        <p>Oleh Ronal Aldinal</p>
      </div>
    </footer>
  );
}
