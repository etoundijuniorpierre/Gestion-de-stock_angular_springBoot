
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  // Add headers including authorization if token exists
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (isPlatformBrowser(platformId)) {
    // Get auth token from localStorage only in browser
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
  }

  const modifiedRequest = req.clone({
    setHeaders: headers
  });
  
  return next(modifiedRequest);
};