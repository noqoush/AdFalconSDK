#
# Be sure to run `pod lib lint AdFalconSDK.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'AdFalconSDK'
  s.version          = '3.5.1'
  s.summary          = 'SDK for AdFalcon'

# This description is used to generate tags and improve search results.
#   * Think: What does it do? Why did you write it? What is the focus?
#   * Try to keep it short, snappy and to the point.
#   * Write the description between the DESC delimiters below.
#   * Finally, don't worry about the indent, CocoaPods strips it!

  s.description      = <<-DESC
SDK for AdFalcon.
                       DESC

  s.homepage         = 'https://github.com/noqoush/AdFalconSDK'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'emad' => 'emadz@noqoush.com' }
  s.source           = { :git => 'https://github.com/noqoush/AdFalconSDK.git', :tag => s.version.to_s }
  s.social_media_url = 'https://twitter.com/adfalcon'

  s.ios.deployment_target = '8.0'

  s.source_files = 'AdFalconSDK/Classes/**/*'
  
  # s.resource_bundles = {
  #   'AdFalconSDK' => ['AdFalconSDK/Assets/*.png']
  # }

  # s.public_header_files = 'Pod/Classes/**/*.h'
  s.frameworks = 'UIKit'
  # s.dependency 'AFNetworking', '~> 2.3'
end
