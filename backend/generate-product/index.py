import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate product card titles and descriptions using OpenAI GPT
    Args: event with httpMethod, body (productName, productCategory, productFeatures)
    Returns: HTTP response with generated title and description
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        import openai
        
        body_data = json.loads(event.get('body', '{}'))
        product_name: str = body_data.get('productName', '')
        product_category: str = body_data.get('productCategory', '')
        product_features: str = body_data.get('productFeatures', '')
        
        if not product_name or not product_category:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'productName and productCategory are required'}),
                'isBase64Encoded': False
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'OPENAI_API_KEY not configured'}),
                'isBase64Encoded': False
            }
        
        client = openai.OpenAI(api_key=api_key)
        
        prompt = f"""Ты - эксперт по созданию продающих карточек товаров для маркетплейсов (Wildberries, Ozon, Яндекс.Маркет).

Товар: {product_name}
Категория: {product_category}
{f'Особенности: {product_features}' if product_features else ''}

Создай:
1. SEO-оптимизированный заголовок (до 200 символов) - включи название, категорию, ключевые преимущества
2. Продающее описание (500-800 символов):
   - Начни с яркого представления товара
   - Перечисли 4-5 ключевых преимуществ с эмодзи
   - Добавь призыв к действию
   - Создай ощущение срочности

Пиши на русском языке, используй эмодзи для визуальной привлекательности."""

        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {'role': 'system', 'content': 'Ты эксперт по созданию продающих описаний товаров для маркетплейсов.'},
                {'role': 'user', 'content': prompt}
            ],
            temperature=0.8,
            max_tokens=800
        )
        
        generated_text = response.choices[0].message.content.strip()
        
        lines = generated_text.split('\n')
        title = ''
        description = ''
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                continue
            if i == 0 or (not title and ('заголовок' in line.lower() or line.startswith('1.'))):
                continue
            elif not title:
                title = line.replace('**', '').replace('*', '').strip()
            elif 'описание' in line.lower() or line.startswith('2.'):
                continue
            else:
                if description:
                    description += '\n'
                description += line.replace('**', '').replace('*', '').strip()
        
        if not title:
            title = f"{product_name} - {product_category} премиум качества | Быстрая доставка"
        
        if not description:
            description = generated_text
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'title': title,
                'description': description
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
