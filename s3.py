from boto.s3.connection import S3Connection
from boto.s3.key import Key
import secrets
import os

class ScreenshotsBucket():
    conn = None
    bucket = None

    def __init__(self):
        self.conn = S3Connection(secrets.aws_access_key, secrets.aws_secret_key)
        rs = self.conn.get_all_buckets()
        for b in rs:
            if b.name == secrets.screenshots_bucket_name:
                self.bucket = b
        
    def upload_screenshot(self, screenshot_file):
        k = Key(self.bucket)
        k.key = screenshot_file
        k.set_contents_from_filename("tmp/" + screenshot_file)
        print "Uploaded " + screenshot_file
