import { ImageResponse } from 'next/og'
 
// إعدادات حجم الأيقونة (حجم مثالي للمتصفحات)
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// الدالة التي ترسم الأيقونة برمجياً بدون ملفات
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0E5E45', // اللون الأخضر الفخم لحسابك
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white', // لون حرف أ
          borderRadius: '50%', // عشان تطلع دائرية
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        أ
      </div>
    ),
    {
      ...size,
    }
  )
}