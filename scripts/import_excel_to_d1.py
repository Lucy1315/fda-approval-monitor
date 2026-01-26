#!/usr/bin/env python3
import pandas as pd
import sys

def escape_sql_string(value):
    """SQL 문자열 이스케이프"""
    if value is None or pd.isna(value):
        return 'NULL'
    if isinstance(value, (int, float)):
        if pd.isna(value):
            return 'NULL'
        return str(value)
    # 문자열 처리
    value = str(value)
    value = value.replace("'", "''")  # SQL 인젝션 방지
    return f"'{value}'"

def main():
    # 엑셀 파일 경로
    excel_file = '/home/user/uploaded_files/202601_usfda.xlsx'
    
    # English 시트 읽기
    print("📖 엑셀 파일 읽는 중...")
    df = pd.read_excel(excel_file, sheet_name='English')
    
    # 색상 범례 행 제거 (마지막 3개 행)
    # approval_date가 날짜 형식이 아닌 행 제거
    df = df[df['approval_date'].astype(str).str.match(r'^\d{4}-\d{2}-\d{2}$', na=False)]
    
    print(f"✅ {len(df)}개 레코드 로드 완료")
    
    # SQL INSERT 문 생성
    sql_statements = []
    
    columns = [
        'approval_month', 'approval_date', 'nda_bla_number', 'application_number',
        'application_type', 'product_name', 'active_ingredient', 'sponsor',
        'indication', 'therapeutic_area', 'is_oncology', 'is_biosimilar',
        'is_novel', 'is_orphan', 'approval_type', 'remarks',
        'fda_approval_page', 'fda_drugs_url', 'approval_letter',
        'source', 'data_collection_date'
    ]
    
    print("🔄 SQL INSERT 문 생성 중...")
    for idx, row in df.iterrows():
        values = [escape_sql_string(row[col]) for col in columns]
        sql = f"INSERT INTO fda_approvals ({', '.join(columns)}) VALUES ({', '.join(values)});"
        sql_statements.append(sql)
    
    # SQL 파일로 저장
    output_file = '/home/user/webapp/seed.sql'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"✅ {len(sql_statements)}개 INSERT 문을 {output_file}에 저장 완료")
    print("\n다음 명령어로 데이터베이스에 임포트하세요:")
    print("  cd /home/user/webapp && npm run db:migrate:local")
    print("  cd /home/user/webapp && npm run db:seed")

if __name__ == '__main__':
    main()
