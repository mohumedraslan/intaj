import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { encrypt } from '@/lib/encryption';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(new URL('/connections?error=auth_failed', req.url));
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Exchange authorization code for access token
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/facebook&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`;
    
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error('Facebook token exchange failed:', tokenData);
      return NextResponse.redirect(new URL('/connections?error=token_failed', req.url));
    }

    // Fetch user's Facebook pages
    const pagesUrl = `https://graph.facebook.com/me/accounts?access_token=${tokenData.access_token}&fields=name,access_token,instagram_business_account{name,id}`;
    const pagesResponse = await fetch(pagesUrl);
    const pagesData = await pagesResponse.json();

    if (!pagesData.data || pagesData.data.length === 0) {
      return NextResponse.redirect(new URL('/connections?error=no_pages', req.url));
    }

    // Save each page and its associated Instagram account
    for (const page of pagesData.data) {
      // Save Facebook page connection
      await supabase.from('connections').insert({
        user_id: user.id,
        platform: 'Facebook',
        display_name: page.name,
        credentials: encrypt(JSON.stringify({
          pageId: page.id,
          accessToken: page.access_token
        }))
      });

      // If page has Instagram business account, save it too
      if (page.instagram_business_account) {
        await supabase.from('connections').insert({
          user_id: user.id,
          platform: 'Instagram',
          display_name: page.instagram_business_account.name,
          credentials: encrypt(JSON.stringify({
            igId: page.instagram_business_account.id,
            pageId: page.id,
            accessToken: page.access_token
          }))
        });
      }
    }

    return NextResponse.redirect(new URL('/connections?success=true', req.url));
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.redirect(new URL('/connections?error=oauth_failed', req.url));
  }
}
