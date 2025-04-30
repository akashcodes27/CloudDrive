import boto3
from django.conf import settings

def get_s3_client():
    return boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )

def upload_file_to_s3(file_obj, filename):
    s3 = get_s3_client()
    s3.upload_fileobj(
        file_obj,
        settings.AWS_STORAGE_BUCKET_NAME,
        filename,
        ExtraArgs={'ACL': 'private'}
    )
    return f"https://{settings.AWS_S3_CUSTOM_DOMAIN}/{filename}"

def list_files_in_s3():
    s3 = get_s3_client()
    response = s3.list_objects_v2(Bucket=settings.AWS_STORAGE_BUCKET_NAME)
    return [obj['Key'] for obj in response.get('Contents', [])]

def generate_presigned_url(filename):
    s3 = get_s3_client()
    url = s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME, 'Key': filename},
        ExpiresIn=3600  # 1 hour validity
    )
    return url

def delete_file_from_s3(filename):
    s3 = get_s3_client()
    s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=filename)
