import unittest
import s3

class SimpleWidgetTestCase(unittest.TestCase):
    def setUp(self):
        self.bucket = s3.ScreenshotsBucket()

    def test_bucket(self):
        print self.bucket.bucket
    def test_upload(self):
        print self.bucket.upload_screenshot("aanvullen_tot_100.png")
