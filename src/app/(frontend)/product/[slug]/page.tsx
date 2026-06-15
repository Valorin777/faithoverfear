import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import ProductGallery from '@/components/product/ProductGallery'
import ProductForm from '@/components/product/ProductForm'
import ProductCard from '@/components/ui/ProductCard'
import { products, reviews } from '@/data/products'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const productReviews = reviews.slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Faith over Fear' },
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `https://faithof.ru/product/${product.slug}`,
    },
  }

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '1.5rem 1.25rem 4rem' }}>

        {/* Хлебные крошки */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
          marginBottom: '2rem',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.72rem', color: '#bbb',
        }}>
          <a href="/" style={{ color: '#bbb', textDecoration: 'none' }}>Главная</a>
          <span>/</span>
          <a href="/catalog" style={{ color: '#bbb', textDecoration: 'none' }}>Каталог</a>
          <span>/</span>
          <span style={{ color: 'var(--navy)' }}>{product.name}</span>
        </nav>

        {/* Основной блок */}
        <div className="product-layout" style={{ display: 'grid', gap: '3rem', marginBottom: '4rem' }}>
          {/* Галерея */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Информация */}
          <div>
            {/* Бейджи */}
            {(product.isNew || product.isBestseller) && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {product.isNew && (
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.62rem', fontWeight: 700,
                    background: 'var(--navy)', color: '#fff',
                    padding: '0.25rem 0.75rem', borderRadius: 2,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    Новинка
                  </span>
                )}
                {product.isBestseller && (
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.62rem', fontWeight: 700,
                    background: 'var(--gold)', color: 'var(--navy)',
                    padding: '0.25rem 0.75rem', borderRadius: 2,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    Хит продаж
                  </span>
                )}
              </div>
            )}

            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              color: 'var(--navy)', fontWeight: 700,
              lineHeight: 1.2, marginBottom: '0.75rem',
            }}>
              {product.name}
            </h1>

            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.9rem', color: '#777',
              lineHeight: 1.75, fontWeight: 300,
              marginBottom: '1.75rem',
            }}>
              {product.description}
            </p>

            <ProductForm product={product} />
          </div>
        </div>

        {/* Духовный смысл */}
        <div style={{
          background: 'var(--navy)', borderRadius: 8,
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '3rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20, opacity: 0.05,
          }}>
            <svg width="120" height="165" viewBox="0 0 32 44" fill="none">
              <rect x="13" y="0" width="6" height="44" rx="3" fill="white"/>
              <rect x="0" y="12" width="32" height="6" rx="3" fill="white"/>
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 36, height: 36, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(201,168,76,0.15)', borderRadius: 6,
            }}>
              <svg width="18" height="26" viewBox="0 0 32 44" fill="none">
                <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--gold)"/>
                <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--gold)"/>
              </svg>
            </div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1rem', fontWeight: 700,
                color: 'var(--gold)', marginBottom: '0.6rem',
              }}>
                Духовный смысл
              </h2>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.8, fontWeight: 300,
                fontStyle: 'italic',
              }}>
                {product.spiritualMeaning}
              </p>
            </div>
          </div>
        </div>

        {/* Характеристики */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.3rem', fontWeight: 700,
            color: 'var(--navy)', marginBottom: '1.25rem',
          }}>
            Характеристики
          </h2>
          <div style={{ borderTop: '1px solid #f0f0f0', maxWidth: 560 }}>
            {[
              ['Состав', '100% хлопок (пеньё)'],
              ['Плотность', '180 г/м²'],
              ['Уход', 'Стирка при 30°C, не отбеливать, гладить при низкой температуре'],
              ['Страна производства', 'Россия'],
              ['Тип печати', 'Шелкография / DTG — стойкий принт'],
              ['Крой', 'Прямой, унисекс'],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '1rem',
                padding: '0.875rem 0',
                borderBottom: '1px solid #f0f0f0',
              }}
                className="spec-row"
              >
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.8rem', color: '#aaa', fontWeight: 400,
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 500,
                  lineHeight: 1.5,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Отзывы */}
        {productReviews.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)',
              }}>
                Отзывы покупателей
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="var(--gold)">
                    <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505L7 1z"/>
                  </svg>
                ))}
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.78rem', color: '#999', marginLeft: '0.25rem',
                }}>
                  4.9 · {productReviews.length} отзыва
                </span>
              </div>
            </div>

            <div className="reviews-grid" style={{ display: 'grid', gap: '1rem' }}>
              {productReviews.map(review => (
                <div key={review.id} style={{
                  background: '#fff', border: '1px solid #f0f0f0',
                  borderRadius: 8, padding: '1.5rem',
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.875rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505L7 1z"
                          fill={i < review.rating ? 'var(--gold)' : '#e8e8e8'}
                        />
                      </svg>
                    ))}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.88rem', color: '#555',
                    lineHeight: 1.8, fontWeight: 300,
                    fontStyle: 'italic', marginBottom: '1.25rem',
                  }}>
                    &laquo;{review.text}&raquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--gold) 0%, #e8c96a 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontWeight: 700, fontSize: '0.8rem', color: 'var(--navy)',
                      flexShrink: 0,
                    }}>
                      {review.author[0]}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)',
                      }}>
                        {review.author}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '0.7rem', color: '#ccc',
                      }}>
                        Проверенная покупка
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* С этим товаром покупают */}
        {related.length > 0 && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.24em',
                textTransform: 'uppercase', color: 'var(--gold)',
                fontWeight: 500, marginBottom: '0.4rem',
              }}>
                Вам может понравиться
              </p>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)',
              }}>
                С этим товаром покупают
              </h2>
            </div>
            <div className="related-grid" style={{ display: 'grid', gap: '1rem' }}>
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-layout {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .product-layout { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }
        .spec-row {
          grid-template-columns: 130px 1fr;
        }
        @media (max-width: 480px) {
          .spec-row { grid-template-columns: 1fr; gap: 0.25rem; }
        }
        .reviews-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .reviews-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .related-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .related-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </PageLayout>
  )
}
