require "shrine"
require "shrine/storage/file_system"

#ディレクトリの指定
Shrine.storages = {
    cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),
    store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"),
}

#プラグイン
Shrine.plugin :activerecord