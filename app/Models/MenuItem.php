<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 11 Jun 2019 23:16:12 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class MenuItem
 * 
 * @property int $id
 * @property string $description
 * @property string $image
 * @property string $name
 * @property int $position
 * @property int $type
 *
 * @package App\Models
 */
class MenuItem extends Eloquent
{
	protected $table = 'menu_item';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'position' => 'int',
		'type' => 'int'
	];

	protected $fillable = [
		'description',
		'image',
		'name',
		'position',
		'type'
	];
}
